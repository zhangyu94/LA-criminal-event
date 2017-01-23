/**
 * Created by huangxinxin on 16/6/17.
 */

export const activeUri = (state) => {
  if (state.ctx) {
    return state.ctx.path
  }
  return ''
}

export const activeRouter = state => state.activeRouter

export const markedContainerList = state => state.markedContainerList

export const filteredDate = state => state.filteredDate
export const filteredDayOfWeek = state => state.filteredDayOfWeek
export const filteredTime = state => state.filteredTime
export const filteredCategory = state => state.filteredCategory
export const filteredResolution = state => state.filteredResolution
