import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';




export default function Blog() {

  const [post , setPost ] = useState([])


  const articoli = async()=>{

    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'

      );


      const APOLLO_QUERY = gql`
      query MyQuery($first: Int, $skip: Int) {
        projects(first: $first, skip: $skip) {
          id
          title
          gallery {
            url
          }
        }
      }
    `;

        const variables = {
            first: 20,
            skip:0
          };

        const projectXpage = await graphcms.request(APOLLO_QUERY,variables)

        console.log(projectXpage.projects);
        setPost(projectXpage.projects)

        console.log('ciao')
        console.log(projectXpage.projects[0].gallery[0].url)

        var cover = projectXpage.projects[0].gallery[0].url
        console.log('cover')

        console.log(cover)

  }



  useEffect(()=>{
    articoli()

  },[])



  return (
<div>
   <div style={{width:'25vW', height:'100vH',position:'fixed'}}>
   <Link href="/">
    <img class='logoImg' src="/LogoTognon.png"/>
    </Link>

    <div class="divButton">
    <Link href="/projects">
    <h3>PROJECTS</h3>  
    </Link>
    <Link href="/collectible">
      <h3>COLLECTIBLE</h3> 
      </Link>
      <Link href="/about">
       <h3>ABOUT</h3>  
       </Link> 
    </div>
   </div>
     <div style={{ width:'75vW', marginLeft:'25vW' }}>
      
     <div style={{ paddingTop:'50px', paddingBottom:'50px', paddingRight:'50px', display: 'flex', flexWrap: 'wrap', gap:'3%', rowGap:'3vH'}} class="flex-container" id="flexContainer">
    
        

<img class='indexCover' src='https://media.graphassets.com/Wk0ohOR7Tpyfxp4TuFEN'/>

    

      </div>
     </div>

     </div>

  )

 
}
