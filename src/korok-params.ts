import Korok from './korok'

export class KorokParamsStore {

  private pageScopedParamGetters: { [key: string]: Korok } = {}

  public registerParam(key: string, korok: Korok) {
    this.pageScopedParamGetters[key] = korok
  }

  public has(key: string) {
    return (this.pageScopedParamGetters, key)
  }

  public get(key: string) {
    if (!this.pageScopedParamGetters[key]) {
      return null
    }

    const korok = this.pageScopedParamGetters[key]

    return korok.serializationParams()[key.substr(5)]
  }

  public clear() {
    this.pageScopedParamGetters = {}
  }

}

export default new KorokParamsStore()
