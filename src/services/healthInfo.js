import axios from 'axios'

const apiUrl = 'https://health.gov/myhealthfinder/api/v3'

const removeUndefinedParams = (params) => {
  let keysForDel = []
  params.forEach((value, key) => {
    if (value === 'undefined'){
      keysForDel.push(key)
    }
  })
  keysForDel.forEach(key => {
    params.delete(key)
  })
  return params
}

const compareStrings = (a, b) => {
  a = a.toLowerCase()
  b = b.toLowerCase()

  return (a < b) ? -1 : (a > b) ? 1 : 0
}

export const getCategoryData = async () => {
  const response = await axios.get('https://health.gov/myhealthfinder/api/v3/itemlist.json?lang=en&type=category')
  const categoryData = response.data
  const categories = categoryData.Result.Items.Item
  console.log(categories)
  const categoryObject = new Object()

  categories.forEach(element => {
    const { Title: name, Id: id } = element
    if (categoryObject.hasOwnProperty(name)) {
      categoryObject[name].push(Number(id))
    } else {
      var list = []
      list.push(Number(id))
      categoryObject[name] = list
    }
  })

  const categoryArray = Object.keys(categoryObject).map(category => {return { value: categoryObject[category], label: category }})

  return categoryArray
}

export const getTopicsByUserInfo = async (request) => {
  console.log(request)
  let url
  if (request.pregnant === true) {
    url = 'https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=127'
  } else {
    let params
    params = new URLSearchParams({ ...request, lang:'en', category:'all' })
    params = removeUndefinedParams(params)
    url = apiUrl + '/myhealthfinder.json?' + params.toString()
  }

  const response = await axios.get(url)

  try {
    console.log(response.data.Result.Query)
    const result = response.data.Result.Resources.all.Resource.sort((a,b) => {return compareStrings(a.Categories, b.Categories)})
    console.log(result)
    return result
  } catch (error) {
    const result = response.data.Result.Resources.Resource.sort((a,b) => {return compareStrings(a.Categories, b.Categories)})
    console.log(result)
    return result
  }
}

export const getTopicsByKeywords = async (keyword) => {
  const params = new URLSearchParams({ keyword })
  const url = apiUrl + '/topicsearch.json?' + params.toString()

  try {
    const response = await axios.get(url)
    const result = response.data.Result.Resources.Resource
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const getTopicsBySelection = async(topic, category) => {
  const { categoryArray } = await getCategoryData()
  const params = new URLSearchParams({
    topicId: topic,
    categoryId: categoryArray[category]
  })
  let keysForDel = []
  params.forEach((value, key) => {
    if (value === 'undefined') {
      keysForDel.push(key)
    }
  })
  keysForDel.forEach(key => {
    params.delete(key)
  })

  const url = apiUrl + '/topicsearch.json?' + params.toString()
  console.log(url)

  try {
    const response = await axios.get(url)
    const result = response.data.Result.Resource.Resources
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const getTopicsByCategories = async(category) => {
  const params = new URLSearchParams({
    categoryId: category
  })

  const url = apiUrl + '/topicsearch.json?' + params.toString()
  console.log(url)

  try {
    const response = await axios.get(url)
    const result = response.data.Result.Resources.Resource
    return result
  } catch (error) {
    throw new Error(error)
  }
}