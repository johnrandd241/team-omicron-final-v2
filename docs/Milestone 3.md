<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.571 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β33
* Sun Nov 20 2022 15:32:34 GMT-0800 (PST)
* Source doc: Database Table layout
* Tables are currently converted to HTML tables.
----->



```
Users Table


<table>
  <tr>
   <td>```

Column
   </td>
   <td>Data Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>Username
   </td>
   <td>Text PRIMARY KEY NOT NULL
   </td>
   <td>unique id for the user, i.e. johnsmith123
   </td>
  </tr>
  <tr>
   <td>NameOfUser
   </td>
   <td>text
   </td>
   <td>String that is the name of the user, like John Smith
   </td>
  </tr>
  <tr>
   <td>Posts
   </td>
   <td>Int[]
   </td>
   <td>a list of post ids, {ffe567d, ccab84d, etc.} Are foreign keys just not declared as such as not possible with arrays. Should be treated like FORGEIN KEYs.
   </td>
  </tr>
  <tr>
   <td>Bio
   </td>
   <td>text
   </td>
   <td>string that the user can customize to describe themselves
   </td>
  </tr>
  <tr>
   <td>Friends
   </td>
   <td>text[]
   </td>
   <td>list of usernames that you are friends with {tomjones18, SICK_GUY, etc.}
   </td>
  </tr>
  <tr>
   <td>Messages
   </td>
   <td>text[]
   </td>
   <td>list of message log ids {48bce9a, ff5cd4a, etc.}  Are foreign keys just not declared as such as not possible with arrays. Should be treated like FORGEIN KEYs.
   </td>
  </tr>
</table>


_Post Table_


<table>
  <tr>
   <td>Column
   </td>
   <td>Data Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>PostID
   </td>
   <td>Int PRIMARY KEY NOT NULL
   </td>
   <td>unique id that species the post (some hex thing like 88f9abc) convert to hex using HEX() function as hex cannot be natively stored.
   </td>
  </tr>
  <tr>
   <td>CreationDate
   </td>
   <td>datetime
   </td>
   <td>Date and time of post creation
   </td>
  </tr>
  <tr>
   <td>imgurl
   </td>
   <td>VARCHAR(2083)
   </td>
   <td>Url of post img
   </td>
  </tr>
  <tr>
   <td>Title
   </td>
   <td>Text NOT NULL
   </td>
   <td>Headline title of post
   </td>
  </tr>
  <tr>
   <td>PostDescription
   </td>
   <td>Text NOT NULL
   </td>
   <td>Text body of post
   </td>
  </tr>
  <tr>
   <td>Comments
   </td>
   <td>Int UNIQUE FOREIGN KEY
   </td>
   <td>Id of the message log associated with the posts comments
   </td>
  </tr>
  <tr>
   <td>PostType
   </td>
   <td>Text NOT NULL
   </td>
   <td>3 options event, people, record
   </td>
  </tr>
  <tr>
   <td>Tags
   </td>
   <td>text
   </td>
   <td>List of tags poster thought would be relevant. Used for search
   </td>
  </tr>
</table>


_Log Table_


<table>
  <tr>
   <td>Column
   </td>
   <td>Data Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>LogID
   </td>
   <td>Int PRIMARY KEY NOT NULL
   </td>
   <td>Unique ID of the comment/message log for referencing
   </td>
  </tr>
</table>


_MessageLog Table_


<table>
  <tr>
   <td>Column
   </td>
   <td>Data Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>MLogID
   </td>
   <td>Int PRIMARY KEY NOT NULL
   </td>
   <td>Unique ID of the message log for referencing
   </td>
  </tr>
  <tr>
   <td>Messages
   </td>
   <td>nvarchar(max)
   </td>
   <td>A Object of list of the messages
   </td>
  </tr>
  <tr>
   <td>Users
   </td>
   <td>Text[] NOT NULL
   </td>
   <td>A list of Users involved in the chat referenced by username
   </td>
  </tr>
</table>


Message Object:

{

	“User”: string   //User who sent the message

	“Date”: date	    //Date and time of message being sent

	“Text”: string  //The body of the message

}

_CommentLog Table_


<table>
  <tr>
   <td>Column
   </td>
   <td>Data Type
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>CLogID
   </td>
   <td>Int PRIMARY KEY IDENTITY(1,1) NOT NULL
   </td>
   <td>Unique ID of the comment log for referencing
   </td>
  </tr>
  <tr>
   <td>Comments
   </td>
   <td>nvarchar(max)
   </td>
   <td>A Object of a list of the comments
   </td>
  </tr>
</table>


Comment Object:

{

	“User”: string   //User who made the comment

	“Date”: date	    //Date and time of comment posting

	“Text”: string  //The body of the comment

}

SQL Query notes



* PRIMARY KEY means that the values in this column are unique, and each value can be used to identify a single row in this table.
* FOREIGN KEY is a consistency check which ensures that each value in this column corresponds to another value in a column in another table. For example, if there are two tables, one listing all Employees by ID, and another listing their payroll information, the `FOREIGN KEY` can ensure that every row in the payroll table corresponds to a valid employee in the master Employee list.
* IDENTITY(n,m) Will start incrementing the field starting at n and incrementing by m everytime a new row is created and that column is not specified.
* DATETIME is in the format YYYY-MM-DD HH:MI:SS
* Arrays represented as 
    * Numbers {int,int, …}
    * Text {“sometext”, “sometext”, …}
    * 2D {{int,int, …},{“sometext”, “sometext”, …}, …} //Wouldnt have multiple data types in same array only for example purposes
* Example Insert for array

    INSERT INTO grades


    	VALUES(1, ‘{{“work”,”[work1@gmail.com](mailto:work1@gmail.com)”},{“other”, “[other@gmail.com](mailto:other@gmail.com)”}}’, ‘{92,34,96,44}’);

* Accessing Arrays NOTE: Indexing starts at 1!

        SELECT


        	Email[1][1] AS type,


        	Email[1][2] AS address,


        	test_scores[1],


        FROM grades;


        This will produce as based on example insert statement


        	


<table>
  <tr>
   <td>
type
   </td>
   <td>address
   </td>
   <td>test_scores
   </td>
  </tr>
  <tr>
   <td>work
   </td>
   <td>work@gmail.com
   </td>
   <td>92
   </td>
  </tr>
  <tr>
   <td>other
   </td>
   <td>other@gmail.com
   </td>
   <td>34
   </td>
  </tr>
</table>




* Queries on Parent and Child Tables
    * To get comments from PostID

        SELECT Comments FROM Post


        INNER JOIN Logs ON Post.Comments=Logs.LogID


        INNER JOIN CommentLog ON Logs.LogID=CommentLog.CLogID


        WHERE Post.PostID = $POSTID  //Where $POSTID is the format string of the js object POSTID used in the js code
