import korokParamsStore from './korok-params'
import messageBus from './message-bus'

export enum PropType {
  'string',
  'number',
  'boolean',
  'json'
}

export interface IKorokProp {
  key?: string
  default?: any
  description?: string
  type?: PropType
  title?: string
  required?: boolean
}

export interface IKorokParam {
  key?: string
  description?: string
  scope?: 'korok' | 'page'
}

// 用于检查卡片配置中绑定项的正则表达式
export const BINDING_COLUMN_REGEX = /^\@\{([\w\d\/\_\-\(\):\'\%\*,]+)\}$/
export const BINDING_COLUMNS_REGEX = /\@\{([\w\d\/\_\-\(\):\'\%\*,]+)\}/g

const defaultPropOption: IKorokProp = {
  default: '',
  description: '',
  type: PropType.string,
  required: false,
  title: ''
}

const defaultParamOption: IKorokParam = {
  description: '',
  scope: 'korok'
}

class KorokProxy {

  private key: string

  constructor(key: string) {
    this.key = key
  }

  registerProp(key: string, options: IKorokProp = defaultPropOption) {
    Korok.registerProp(this.key, key, options)

    return this
  }

  registerParam(key: string, options: IKorokParam = defaultParamOption) {
    Korok.registerParam(this.key, key, options)

    return this
  }

}

export default class Korok {

  /* Korok class properties */
  private static koroks: { [key: string]: any } = {}

  private static regularProps: { [key: string]: IKorokProp } = {}
  private static korokPropsMap: { [key: string]: IKorokProp[] } = {}
  private static korokParamsMap: { [key: string]: IKorokParam[] } = {}
  public static PropTypes = PropType
  public static messageBus = messageBus

  public static register(key: string, comp: any) {
    if (!this.koroks[key]) {
      this.koroks[key] = comp
    }

    return new KorokProxy(key)
  }

  public static get(key: string) {
    if (this.koroks[key]) {
      return this.koroks[key]
    }

    return null
  }

  public static registerRegularProp(key: string, option: IKorokProp = defaultPropOption) {
    option.key = key
    this.regularProps[key] = option
  }

  public static registerProp(korokKey: string, key: string, options: IKorokProp = defaultPropOption) {
    if (!this.korokPropsMap[korokKey]) {
      this.korokPropsMap[korokKey] = []
    }

    this.korokPropsMap[korokKey].push({
      key, ...options
    })
  }

  public static registerParam(korokKey: string, key: string, options: IKorokParam = defaultParamOption) {
    if (!this.korokParamsMap[korokKey]) {
      this.korokParamsMap[korokKey] = []
    }

    this.korokParamsMap[korokKey].push({
      key, ...options
    })
  }

  /* Korok instance properties */
  private key: string
  private id: string = Math.random().toString(32).substr(2).substr(2, 4)
  private props: { [key: string]: any } = {}
  private paramsFunc: () => { [key: string]: any } = () => ({})
  private reactionCallback: () => any = () => void(0)

  public get Korok() {
    return this.constructor as typeof Korok
  }

  constructor(key: string, props?: any) {
    this.key = key

    if (props !== null && props !== undefined && props.toString() === '[object Object]') {
      this.props = props
    }

    this.compose()
  }

  public reaction(reactionCallback: () => any) {
    this.reactionCallback = reactionCallback

    return this
  }

  public compose(reactionCallback?: () => any) {
    const korokParamConfigs = this.Korok.korokParamsMap[this.key] || []
    for (const param of korokParamConfigs) {
      korokParamsStore.registerParam(
        `${param.scope === 'page' ? 'page' : this.id}:${param.key}`,
        this
      )
    }

    if (reactionCallback) {
      this.reaction(reactionCallback)
    }

    this.Korok.messageBus.on('reaction', this.reactionCallback)

    return this
  }

  public dispose() {
    this.Korok.messageBus.removeListener('reaction', this.reactionCallback)

    return this
  }

  public dispatch() {
    this.Korok.messageBus.emit("reaction");

    return this;
  }
  
  public setProp(key: string, value: any) {
    this.props[key] = value
    this.Korok.messageBus.emit("reaction");

    return this
  }

  public setProps(props: { [key: string]: any }) {
    if (props.toString() === '[object Object]') {
      this.props = {
        ...this.props,
        ...props
      }
      this.Korok.messageBus.emit("reaction");
    }

    return this
  }

  public getPropsList() {
    const regularProps = []

    for (const key in this.Korok.regularProps) {
      regularProps.push(this.Korok.regularProps[key])
    }

    return (this.Korok.korokPropsMap[this.key] || []).concat(regularProps)
  }

  public getParamsList() {
    return this.Korok.korokParamsMap[this.key] || []
  }

  public bindParam(paramsFunc: () => { [key: string]: any }) {
    this.paramsFunc = paramsFunc.bind(this)

    return this
  }

  public serializationParams() {
    return this.paramsFunc()
  }

  // 转换 @{xxx} 到 xxx
  public getColumnField(pattern: string) {
    const match = pattern.match(BINDING_COLUMN_REGEX)
    return match ? match[1] : ''
  }

  public getProp<T>(key: string): T | null {
    const originalValue = this.getOriginalProp<string | number | boolean>(key)

    if (!originalValue || typeof originalValue !== 'string') {
      return this.getOriginalProp<T>(key)
    }

    return this.processColumnBinding(originalValue) as T
  }

  public getOriginalProp<T>(key: string): T | null {
    const props = this.getPropsList()
    const propConfig = props.find(prop => prop.key === key)

    if (!propConfig) {
      return null
    }

    let propValue = this.props[key]
    if (propValue === null || propValue === undefined) {
      propValue = propConfig.default
    }

    return propValue
  }

  public getParam<T>(key: string) {
    return korokParamsStore.get(key.startsWith('page:') ? key : `${this.id}:${key}`) as T
  }

  private getColumn(pattern: string) {
    const column = this.getColumnField(pattern)
    return this.getParam(column)
  }

  public processColumnBinding(value: string) {
    if (typeof value === 'string' && value.match(BINDING_COLUMNS_REGEX)) {

      if (value.match(BINDING_COLUMN_REGEX)) {
        return this.getColumn(value)
      }

      const match = value.match(BINDING_COLUMNS_REGEX)
      if (match) {
        const columns = match
          .map(columnMatch => {
            const columnValue: any = this.getColumn(columnMatch) || this.getProp(this.getColumnField(columnMatch))

            return [ this.getColumnField(columnMatch), columnValue ]
          })
          .filter(([ _, columnValue ]) => !!columnValue)

        let finalValue = value

        for (const [ field, columnValue ] of columns) {
          finalValue = finalValue.replace(`@{${field}}`, columnValue)
        }

        return finalValue
      } else {
        return null
      }
    } else {
      return value
    }
  }

}