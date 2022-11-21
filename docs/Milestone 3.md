## SQL Database Table Layout

# _Users Table_
![](Users.png)


# _Post Table_
![](Post.png)

# _MessageLog Table_
![](MessageLog.png)

Message Object:{

	“User”: string   //User who sent the message
	“Date”: date	    //Date and time of message being sent
	“Text”: string  //The body of the message
    
}

# _CommentLog Table_
![](CommentLOg.png)


Comment Object:{

	“User”: string   //User who made the comment
	“Date”: date	    //Date and time of comment posting
	“Text”: string  //The body of the comment
}

# Division of Labor
Connor Andrews: Seting up and Server side implementation
John Rand: Implement client side database calls and tested functionality
John Steinbruggen: Implement client side database calls and test functionality