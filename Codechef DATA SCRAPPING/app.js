const axios = require("axios");
const fs = require("fs");

const fetchContests = async (token)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"https://api.codechef.com",
            headers: {"Authorization": `Bearer ${token}`}
        })

        const res = await fetch({
            url:"/contests"
        });
        return res.data.result.data.content.contestList;
    }catch(e){
        console.log(e)
    }
}


const fetchProblems = async (token, code)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"https://api.codechef.com",
            headers: {"Authorization": `Bearer ${token}`}
        })

        const res = await fetch({
            url:`/contests/${code}`
        });
        return res.data.result.data.content.problemsList;
    }catch(e){
        console.log(e)
    }
}

const fetchProblem = async (token, code, problemCode)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"https://api.codechef.com",
            headers: {"Authorization": `Bearer ${token}`}
        })

        const res = await fetch({
            url:`/contests/${code}/problems/${problemCode}`
        });
        return res.data.result.data.content;
    }catch(e){
        console.log(e)
    }
}

const generateToken = async ()=>{
    try{
        const fetch = axios.default.create({
            baseURL:"https://api.codechef.com"
        })

        const res = await fetch({
            method:"post",
            url:`/oauth/token`,
            data:{
                "grant_type": "client_credentials",
                "client_id":"453402f4d201bc3919ed7757891b1b71",
                "client_secret":"d60b233fd44a766801040ea945faa617",
                "redirect_uri":"http://localhost:8000",
                "scope":"public"
            }
        });
        return res.data.result.data.access_token;
    }catch(e){
        console.log(e)
    }
}

// (async ()=>{
//     let i = 0;
//     let token = await generateToken();
//     const constest = await fetchContests(token); 
//     setInterval(function(){
//         (async ()=>{
//             let j=0;
//             token = await generateToken(); 
//             while(j<5){
//                 const problems = await fetchProblems(token,constest[i].code);
//                 problems.forEach(async (problem)=>{
//                     const problemInfo = await fetchProblem(token, constest[i].code, problem.problemCode);
//                     const json = JSON.stringify(problemInfo);
//                     console.log(json);
//                 })
//                 i++;j++;
//             }
//         })()
//     },1000*60*5+1000); // 5min 1sec
// })();



const fetchTags = async (i)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"http://slim",
        })

        const res = await fetch({
            url:`/tags/problems`,
            params:{
                limit:100,
                offset:i
            }
        });
        return res.data.result.data.content;
    }catch(e){
        console.log(e)
    }
}

const fetchProblemsWithDiff = async (diff)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"http://slim",
        })

        const res = await fetch({
            url:`/problems/${diff}`
        });
        return res.data.result.data.content;
    }catch(e){
        console.log(e)
    }
}

const fetchProblemsWithTag = async (tag)=>{
    try{
        const fetch = axios.default.create({
            baseURL:"http://slim",
        })

        const res = await fetch({
            url:`tags/problems`,
            params:{
                filter:tag
            }
        });
        return (res.data.status==="OK")? res.data.result.data.content:{};
    }catch(e){
        console.log(e)
    }
}

function chk(diff, code){
    let ans=-1;
    for(let i=0;i<diff.length;i++){
        if(diff[i].problemCode===code){
            ans=i;
            break;
        }
    }
    return ans;
}

async function searchWithTags(i){
    let problems = fs.readFileSync('problems1.json');
    problems = JSON.parse(problems);
    let tags = fs.readFileSync('tags1.json');
    tags = JSON.parse(tags);
    for(let j =i; j<i+30;j++){
        const res = await fetchProblemsWithTag(tags[j]);
        Object.keys(res).forEach((key)=>{
            const easy = chk(problems.easy,key);
            const medium = chk(problems.medium,key);
            const hard = chk(problems.hard,key);
            if(easy!=-1){
                problems.easy[easy].tags = res[key].tags;
                problems.easy[easy].author = res[key].author;
                // console.log(problems.easy[easy]);
            }

            if(medium!=-1){
                problems.medium[medium].tags = res[key].tags;
                problems.medium[medium].author = res[key].author;
                // console.log(problems.medium[medium]);
            }

            if(hard!=-1){
                problems.hard[hard].tags = res[key].tags;
                problems.hard[hard].author = res[key].author;
                // console.log(problems.hard[hard]);
            }
        })
    }

    fs.writeFileSync('problems1.json',JSON.stringify(problems));
}

async function addProblem(problem, diff){
    try{
        const fetch = axios.default.create({
            baseURL:"http://slim",
        })

        const res = await fetch({
            method:'POST',
            url:`/add-problem`,
            data:{
                name:problem.problemName,
                code:problem.problemCode,
                sub:problem.successfulSubmissions,
                accuracy:problem.accuracy,
                tags:problem.tags,
                author:problem.author,
                difficulty:diff
            }
        });
        return res.data;
    }catch(e){
        console.log(e)
    }
}


// Send request in every 5 mins
let i =0;
// setInterval(function(){
//     (async ()=>{
//         await searchWithTags(i);
//         console.log(i);
//         i+=30;
//     })()
// },1000*5*60+1000);



// Add data
(async ()=>{
    let rawdata = fs.readFileSync('problems1.json');
    let problems = JSON.parse(rawdata);
    // for(let j = 0;j<problems.easy.length;j++){
    //     let problem = problems.easy[j];
    //     if(problem.tags){
    //         await addProblem(problem,"easy");
    //         console.log(j);
    //     }
    // }
    // for(let j = 0;j<problems.medium.length;j++){
    //     let problem = problems.medium[j];
    //     if(problem.tags){
    //         await addProblem(problem,"medium");
    //            console.log(j);

    //     }
    // }
    for(let j = 0;j<problems.hard.length; j++){
        let problem = problems.hard[j];
        if(problem.tags){
            await addProblem(problem,"hard");
    console.log(j);
        }
    }
})()

// (async()=>{
//     try{
//     const res =  await addProblem({ "problemCode": "QSTRING",
//     "problemName": "Stringology is Magic",
//     "successfulSubmissions": 1,
//     "accuracy": 0.1763668430335097,
//     "tags": ["suffix-array", "medium", "oct14", "xiaodao"],
//     "author": "xiaodao"}, "easy");
//     console.log(res.data);
//     }catch(e){
//     }
// })();








