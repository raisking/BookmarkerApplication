document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark
function saveBookmark(e){
//Get form values 
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

if(!validateForm(siteName, siteUrl)){
    return false;

}
var bookmark = {
    name: siteName, 
    url: siteUrl
}
console.log(bookmark);
console.log(siteName);



//local storage test
// localStorage.setItem('test', 'Hello World');
// console.log(localStorage.getItem('test'));

// localStorage.removeItem('test');
// console.log(localStorage.removeItem('test'));

//Test if bookmarks is null
if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    //Add to array
    bookmarks.push(bookmark);
    //set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmarks to array 
    bookmarks.push(bookmark);
    //Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//clear form
    document.getElementById('myForm').reset();
    //re-fetch bookmarks 
    fetchBookmarks();

    e.preventDefault();
}
//Detel Bookmark
function deleteBookmark(url){
    //Get bookmarks from localStorage

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop throught bookmarks 
    for(var i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);

        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //re-fetch bookmarks 
    fetchBookmarks();
console.log(url);
}
//Fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">' + 
                                        '<h4>' + name + ' ' +
                                        '<a class ="btn btn-info" target="_blank" href="' + url + '">Visit</a>'  +  ' ' +
                                        '<a onclick="deleteBookmark(\'' + url + '\')" class ="btn btn-danger" href="#">Delete</a>'  + 
                                        '</h4>' +
                                    '</div>';
    }

}
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please a valid URL');
        return false;
    }
    return true;
}