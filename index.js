import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')

tweetBtn.addEventListener('click', function(){
    console.log(tweetInput.value)
})

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
})



function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--

    }
    else{
        targetTweetObj.likes++
          
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked    
    render()
}


function handleRetweetClick(tweetId){
    const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--
    }
    else{
        targetRetweetObj.retweets++
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    render()
}

function getFeedHtml(){
    let feedHtml = ``
  
    tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}// document.addEventListener('click', function(event){
                        //     if(event.target.dataset.retweet){
                        //        handleRetweetClick(event.target.dataset.retweet) 
                        //     }
                           
                        // })
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()

