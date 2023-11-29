
module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php',
    elements: {
        searchBox: {
            selector: '#searchbox'
        },
        searchQuery: {
            selector: '#search_query_top'
        },
        submitSearch: {
            selector: 'button[name="submit_search"]'
        },
        productListItem: {
            selector: '.page-heading.product-listing span[class="lighter"]'
        },
        productList: {
            selector: '#product_list'
        },
        products: {
            selector: '#product_list li'
        }
    }
}