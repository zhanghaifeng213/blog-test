import http from "@/libs/index.js"
export const articleList = (pageNum) => {
  return http({
    method: 'get',
    url: http.adornUrl('page/' + pageNum),
  })
}
export const commentLists = (articleId) => {
  return http({
    method: 'get',
    url: http.adornUrl('article/' + articleId),
  })
}
export const publishComment = (data) => {
  return http({
    method: 'post',
    url: http.adornUrl('comment'),
    data
  })
}
export const publishArticle = (data) => {
  return http({
    method: 'post',
    url: http.adornUrl('article'),
    data
  })
}
export const uploadAvatar = (data) => {
  return http({
    method: 'post',
    url: http.adornUrl('upload'),
    data
  })
}