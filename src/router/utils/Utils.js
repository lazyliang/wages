/**
 * 多条件分页
 * @param temPage
 * @param pagination
 * @param searchFields
 * @returns {{}}
 */
  export const handleSeerchAndPage = (temPage, pagination, searchFields) => {
  if (temPage) {
    temPage--
  } else if (pagination.page) {
    temPage = pagination.page - 1
  } else {
    temPage = 0
  }
  // 构建查询参数
  let search = {}
  Object.keys(searchFields).forEach(key => {
    search[`search.${key}`] = searchFields[key].value ? searchFields[key].value : (searchFields[key] ? searchFields[key] : '')
  })
  search.page = temPage
  search.size = 10
  return search
}
/**
 * 平行tree结构取ids
 * @param node
 * @returns {Array}
 */
export const getTreeIds = (node) => {
  var ids = []
  for (var i = 0; i < node.length; i++) {
    ids.push(node[i].id.toString())
    ids = ids.concat(getTreeIds(node[i].children))
  }
  return ids
}
