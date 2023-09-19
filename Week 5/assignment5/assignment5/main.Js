var countPosts = 0;
function postFunction()
{
    var inputText =  "";
    var outPutText = "";
    inputText = document.getElementById("text1").value;
    if(countPosts == 0)
    {
        outPutText = document.getElementById("topic1").innerHTML = inputText;
        countPosts++;
    }
    else if(countPosts == 1)
    {
        outPutText = document.getElementById("comment1").innerHTML = inputText;
        countPosts++;
    }
    else
    {
        outPutText = document.getElementById("comment2").innerHTML = inputText;
        countPosts++;
    }
    
}
function clearFunction()
{
    countPosts = 0;
    document.getElementById("topic1").innerHTML = "";
    document.getElementById("comment1").innerHTML = "";
    document.getElementById("comment2").innerHTML = "";
}