
import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request';
import { gql } from 'graphql-request';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'



export default function Blog() {


  const router = useRouter()

  const [post , setPost ] = useState([])


  const articoli = async (id) => {
    const graphcms = new GraphQLClient(
        'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clnyvwdsv03co01tc0on38e2k/master'
    );

    // Modifica la query per accettare una variabile
    const APOLLO_QUERY = gql`
        query MyQuery($projectId: String!) {
          collectibles(where: {slug: $projectId}) {
                id
                title
                gallery {
                    url
                }
            }
        }
    `;

    const variables = {
        projectId: id, // Utilizza la variabile 'id' passata alla funzione
    };

    const projectXpage = await graphcms.request(APOLLO_QUERY, variables);

    console.log('vediamo pro');
    console.log(projectXpage.collectibles[0]);
    setPost(projectXpage.collectibles[0]);

    console.log('ei')
    console.log(post.gallery)

}



  useEffect(()=>{
     //articoli()

  },[])

  useEffect(()=>{
    console.log('mostra');
    console.log(router.query.id);
    if(router.query?.id){
        articoli(router.query.id)
    }
    
 

  },[router])



  return (
<div>
   <div class='header'>
   <div class='logo'><Link href="/">
    <img class='logoImg' src="/LogoTognon.png"/>
    </Link>
    </div>
    <div class="menu">
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
     <div class='contentArea'>
      
     <div style={{ paddingTop:'50px', paddingBottom:'50px', paddingRight:'50px', display: 'flex',gap:'1%'}} class="flex-container" id="flexContainer">
    <div style={{position:'fixed',bottom:0,right:0, padding:'2vw'}}>
    <h1>{post?.title}</h1>
                 <Link href={{
    pathname: '/brandpage/'+ post?.brand?.name
  }}> 
    <h1>{post?.brand?.name}</h1>
       </Link> 
    </div>
    {post?.gallery?.map((o,i)=>{
        return(
            <img class="galleryImg" src={o.url}/>

        )
    })}


    
      </div>

   
     </div>

     </div>

  )

 
}




