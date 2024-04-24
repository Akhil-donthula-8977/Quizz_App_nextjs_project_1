import { Queue } from "quirrel/next-app"
export const emailQueue = Queue(
  "api/queues/result", // 👈 the route it's reachable on
  async  (job, meta) => {
    console.log(job.body)

  }
)

export const POST = emailQueue