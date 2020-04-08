function filter(content){   
    switch(content){
        case "airing":
        case "topanime":
        case "upcoming":
        case "movie":
        case "tv":
        case "ova":
        case "ona":
        case "special":
        case "bypopularity":
        case "favorite":
            return content;
        break;
        
        default: 
            return false;
    }
}

export default filter;
