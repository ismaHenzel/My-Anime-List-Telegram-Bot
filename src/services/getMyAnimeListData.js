import cheerio from "cheerio";
import request from "request";

function getMyAnimeListData(command){
    let url = `https://myanimelist.net/topanime.php?type=${command}`;
    return new Promise((resolve, reject)=>{
        let data = []
        request(url, (err, res , html)=>{
            if(err || res.statusCode != 200) reject("Error");
            let $ = cheerio.load(html);
            let title = $("#content > div.pb12 > h2 ").find("span").remove().end().text()
            data.push(`<<< ${title} >>>\n`);
            $("#content > div.pb12 > table > tbody > tr:nth-child(n+2)").each(async function(item){
                let position = $(this).find("td.rank.ac > span").text();
                let name = $(this).find("td.title.al.va-t.word-break > div > div.di-ib.clearfix")
                    .text()
                    .replace("Watch Episode Video", "")
                    .replace("Watch Promotional Video", "")
                await data.push(`${position} ° - ${name}`); 
                resolve(data)
            })
        })
    })
    
}

export default getMyAnimeListData;