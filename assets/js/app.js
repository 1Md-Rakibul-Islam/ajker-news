// feach data categories
const loadCategories = () => {
    const url =`https://openapi.programming-hero.com/api/news/categories`

    fetch(url)
    .then(res => res.json())
    .then(data => newsTitle(data.data.news_category))

}

loadCategories()


// set news title and show the display
const newsTitle = newses => {
    const newsUl = document.getElementById('news-menu-single')

    newses.forEach(news => {
        const createLI = document.createElement('li');

        createLI.classList.add('menu-bar');
        createLI.innerHTML = `
            <a onclick="loadCategory('${news.category_id}')">${news.category_name}</a>
        `
        newsUl.appendChild(createLI)

    })
}

// load dynamic category
const loadCategory = categoryID => {
    // console.log(categoryID);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`

    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data))
}


// display the category

const displayCategory = category => {
    console.log(category);
    
}





