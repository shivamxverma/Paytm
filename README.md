# Courseq

User can register
User can login
User can buy a course 

Schema Design :

User 

id
email
password
role  -- USER | CREATOR | ADMIN
created 
updated


Course 

id
title
description 
category - 'Educational' | 'Finance' | 'Skill' | 'Computer'
price
thumbnail
published
user_id
startdate
enddate
createdat 
updatedat 



Purchase 
id
courseid
userid
amount
status - 'PENDING' | 'SUCCESS' | 'FAILED'
createdat
updatedat
UNIQUE(user_id, course_id)


