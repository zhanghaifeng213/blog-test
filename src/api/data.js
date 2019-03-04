import http from "@/libs/index.js"
export const articleList = (pageNum) => {
  return http({
    method: 'get',
    url: http.adornUrl('page/' + pageNum),
  })
}

