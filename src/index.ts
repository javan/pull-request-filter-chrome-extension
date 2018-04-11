import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"
import { FileBucketObserver } from "./observers/file_bucket_observer"

const application = Application.start()
const context = require.context("./controllers", true)
application.load(definitionsFromContext(context))

const observer = new FileBucketObserver
observer.start()
