
export default class App {
  constructor (el, template) {
    this.el = el;
    this.template = template;
  }

  render () {
    this.el.innerHTML = this.template;
    this._afterRender();
  }

  _afterRender () {
    // intentionally left blank
  }
}
