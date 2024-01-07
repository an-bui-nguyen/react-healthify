import axios from 'axios'

const apiUrl = 'https://health.gov/myhealthfinder/api/v3'


const getSubCategoriesToFilter = (topicArray) => {
  const categoryArray = []
  topicArray.forEach((element) => {
    const categories = element.Categories.split(',').map((item) => item.trim())
    categories.forEach((category) => {
      categoryArray.push(category)
    })
  })
  return removeDuplicates(categoryArray).sort((a,b) => (a < b) ? -1 : (a > b) ? 1 : 0).map(category => {return { label: category, value: category }})
}

/**
 * A function to replace the default categories field returned by the API to an array of categories for ease of filter and sort.
 * @param {} element categories string given by API
 * @returns array of categories
 */
const replaceCategoryString = (element) => {
  const categoryArray = []
  const categories = element.Categories.split(',').map((item) => item.trim())
  categories.forEach((category) => {
    categoryArray.push(category)
  })
  return { ...element, Categories: categoryArray }
}

function removeDuplicates(arr) {
  let unique = arr.reduce(function (acc, curr) {
    if (!acc.includes(curr))
      acc.push(curr)
    return acc
  }, [])
  return unique
}

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

/**
 * API request for main functionality of app. Performs API request to MyHealthFinder with age, sex, smoke, pregnancy, and sexually active params, retrieves array of topics.
 * @param {*} request
 * @returns array of topics to display
 */
export const getTopicsByUserInfo = async (request) => {
  console.log(request)
  let url
  let params
  if (request.age <= 10) {
    params = new URLSearchParams({ age: request.age, sex: request.sex, category: 'all', lang: 'en' })
    url = apiUrl + '/myhealthfinder.json?' + params.toString()
  } else {
    params = new URLSearchParams({ ...request, lang:'en', category:'all' })
    params = removeUndefinedParams(params)
    url = apiUrl + '/myhealthfinder.json?' + params.toString()
  }

  const response = await axios.get(url)

  try {
    console.log(url)
    let result
    result = response.data.Result.Resources.all.Resource
    if (request.pregnant === true) {
      const pregnantResults = await axios.get('https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=127')
      result.push(...pregnantResults.data.Result.Resources.Resource)
    }
    const subCategories = getSubCategoriesToFilter(result)
    return { result: result.sort((a,b) => {return compareStrings(a.Categories, b.Categories)}).map(replaceCategoryString), subCategories }
  } catch (error) {
    const result = response.data.Result.Resources.Resource
    const subCategories = getSubCategoriesToFilter(result)
    return { result: result.sort((a,b) => {return compareStrings(a.Categories, b.Categories)}).map(replaceCategoryString), subCategories }
  }
}

/**
 * Performs an API request to retrieve an array of topics with queried categories.
 * @param {*} category user selected categories
 * @returns array of categories for display
 */
export const getTopicsByCategories = async(category) => {
  const params = new URLSearchParams({
    categoryId: category
  })

  const url = apiUrl + '/topicsearch.json?' + params.toString()
  console.log(url)

  try {
    const response = await axios.get(url)
    const result = response.data.Result.Resources.Resource
    const subCategories = getSubCategoriesToFilter(result)
    return { result: result.sort((a,b) => {return compareStrings(a.Categories, b.Categories)}).map(replaceCategoryString), subCategories }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * Performs an API request to retrieve topic data based on id
 * @param {*} id
 * @returns topic data
 */
export const getTopicById = async (id) => {
  try {
    const response = await axios.get(`https://health.gov/myhealthfinder/api/v3/topicsearch.json?topicId=${id}`)
    const result = response.data.Result.Resources.Resource[0]
    return result
  } catch (error) {
    console.log(error)
  }
}

/**
 * Legacy function to get category data from API
 * @returns array of categories that matches prop types for React Select
 */
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
  console.log(categoryArray)

  return categoryArray
}
/**
 * Legacy for getting topics when user selects topic or category, now only allows category selection
 * @param {*} topic user selected topic
 * @param {*} category user selected category
 * @returns array of topics for user's topic or category
 */
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

/**
 * Legacy for getting topics based on user input keyword. API does not handle the request well so functionality is scrapped.
 * @param {*} keyword
 * @returns array of topics
 */
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