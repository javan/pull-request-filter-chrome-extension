import { AttributeObserver, AttributeObserverDelegate } from "@stimulus/mutation-observers"
import { FileObserver } from "./file_observer"

export class FileBucketObserver implements AttributeObserverDelegate {
  observer: AttributeObserver
  fileObserver: FileObserver

  domID = "files_bucket"

  constructor() {
    this.observer = new AttributeObserver(document.documentElement, "id", this)
  }

  start() {
    this.observer.start()
  }

  stop() {
    this.observer.stop()
  }

  elementMatchedAttribute(element: Element, attributeName: string) {
    if (element.id != this.domID) return
    if (this.fileObserver) this.fileObserver.stop()

    element.querySelector(".diffbar-item.toc-select").insertAdjacentHTML("afterend", filterMenuHTML)
    element.setAttribute("data-controller", "filter")

    this.fileObserver = new FileObserver(element)

    requestAnimationFrame(() => {
      if (this.fileObserver) {
        this.fileObserver.start()
      }
    })
  }

  elementUnmatchedAttribute(element: Element, attributeName: string) {
    if (element.id != this.domID) return

    if (this.fileObserver) {
      this.fileObserver.stop()
      this.fileObserver = null
    }
  }
}

const filterMenuHTML = `
  <div class="diffbar-item">
    <div class="select-menu js-menu-container js-select-menu js-transitionable">
      <div class="js-select-button">
        <button type="button" class="btn-link muted-link select-menu-button js-menu-target" aria-expanded="false" aria-haspopup="true">
          <strong>File type…</strong>
        </button>
      </div>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal js-menu-content" aria-expanded="false">
          <div class="select-menu-header">
            <span class="select-menu-title">Filter by file type</span>
          </div>
          <div class="select-menu-list js-navigation-container js-active-navigation-container" role="menu">
            <ul data-target="filter.typeList" class="filter-type-list"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>
`.trim()
