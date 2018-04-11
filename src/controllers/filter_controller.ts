import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "typeList", "typeInput", "file" ]

  typeListTarget: HTMLUListElement
  typeInputTargets: HTMLInputElement[]
  fileTargets: HTMLElement[]

  initialize() {
    const observer = new MutationObserver(_ => this.renderTypeList())
    observer.observe(this.element, {
      attributes: true,
      attributeFilter: [`data-${this.identifier}-types`]
    })
  }

  checkExclusively(event) {
    if (event.metaKey) {
      event.preventDefault()
      this.typeInputTargets.forEach(element => {
        element.checked = element == event.target
      })
      this.render()
    }
  }

  render() {
    const { selectedTypes } = this
    this.fileTargets.forEach(element => {
      const type = element.getAttribute("data-file-type")
      element.hidden = !selectedTypes.has(type)
    })
  }

  private get types(): Set<string> {
    const values = this.data.get("types").split(",")
    return new Set(values)
  }

  private get selectedTypes(): Set<string> {
    const values = this.typeInputTargets.filter(e => e.checked).map(e => e.value)
    return new Set(values)
  }

  private get unselectedTypes(): Set<string> {
    const values = this.typeInputTargets.filter(e => !e.checked).map(e => e.value)
    return new Set(values)
  }

  private get typeListHTML(): string {
    const { unselectedTypes } = this
    return Array.from(this.types).map(type => `
      <li class="file-info">
        <label>
          <input type="checkbox" value="${type}" ${unselectedTypes.has(type) ? "" : "checked"}
            data-target="filter.typeInput"
            data-action="click->filter#checkExclusively filter#render">
          ${type == "other" ? "" : "."}${type}
        </label>
      </li>`.trim()
    ).join("")
  }

  private renderTypeList() {
    this.typeListTarget.innerHTML = this.typeListHTML
  }
}
