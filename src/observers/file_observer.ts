import { AttributeObserver, AttributeObserverDelegate } from "@stimulus/mutation-observers"

export class FileObserver implements AttributeObserverDelegate {
  element: Element
  types: Set<string>
  observer: AttributeObserver

  attributeName = "data-path"

  constructor(element: Element) {
    this.element = element
    this.types = new Set
    this.observer = new AttributeObserver(this.element, this.attributeName, this)
  }

  start() {
    this.observer.start()
  }

  stop() {
    this.observer.stop()
  }

  elementMatchedAttribute(element: Element, attributeName: string) {
    const containerElement = element.closest(".js-details-container") as HTMLElement
    const match = element.getAttribute(this.attributeName).match(/\.(\w+)$/)
    const type = match ? match[1] : "other"

    containerElement.setAttribute("data-target", `filter.file`)
    containerElement.setAttribute("data-file-type", type)

    this.addType(type)
  }

  elementUnmatchedAttribute(element: Element, attributeName: string) {

  }

  private addType(type: string) {
    if (!this.types.has(type)) {
      this.types.add(type)
      this.element.setAttribute("data-filter-types", Array.from(this.types).join(","))
    }
  }
}
