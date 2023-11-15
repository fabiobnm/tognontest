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
        collectibles(first: $first, skip: $skip) {
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

        console.log(projectXpage.collectibles);
        setPost(projectXpage.collectibles)

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
       <h3 style={{textDecoration: 'underline', textUnderlineOffset: '5px', textDecorationThickness: '1px'}}>ABOUT</h3>  
       </Link>
    </div>
   </div>
     <div style={{ width:'75vW', marginLeft:'25vW' }}>
      
     <div style={{ paddingTop:'50px', paddingBottom:'50px', paddingRight:'50px', display: 'flex', flexWrap: 'wrap', gap:'3%', rowGap:'3vH'}} class="flex-container" id="flexContainer">
        
        <h3>Andrea Tognon Architecture was founded in 2002.
Our aim is to understand and develop strategies of communication, branding and transforming spaces. We define identities in the dynamic process of complex urban situations. The office combines practice with research in a multi-disciplinary process while drawing upon a network of creatives as well as technical and engineering firms. We have collaborated with such clients as Bottega Veneta, Krizia, Tod’s, Lamarthe, Céline, LVMH group, Max Mara Fashion Group, Omega and Jil Sander, as well as private commissions.
Andrea Tognon Architecture Via Volta 11
Sesto, Milano studio@atognon.com
We are always looking for new talents to join our team.
If you are interested in an internship mail us at studio@atognon.com</h3>
      </div>
     </div>

     </div>

  )

 
}
