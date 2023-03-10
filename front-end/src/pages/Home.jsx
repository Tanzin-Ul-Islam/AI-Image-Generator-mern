import React, { useEffect, useState } from 'react'
import Card from '../component/card/Card';
import Loader from '../component/loader/Loader';
import FormField from '../component/formField/FormField';
import axios from 'axios'

export default function Home() {

  let [loading, setLoading] = useState(false);
  let [posts, setPosts] = useState([]);

  let [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [searchTimeOut, setsearchTimeOut] = useState(null)
  useEffect(() => {
    fetchPosts();
  }, [])

  const RenderCards = ({ data, title }) => {
    if (data.length > 0) {
      return data.map((post) => {
        return (
          <Card key={post._id} {...post} />
        )
      })
    } else {
      return (
        <h2 className='mt-5 font-bold text-xl uppercase'>{title}</h2>
      )
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      await axios({
        method: "GET",
        url: "http://localhost:3003/api/v1/posts",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => {
        if (response.status == 200) {
          let data = response.data.data
          setPosts(data);
        }
      }).catch(error => {
        console.log(error);
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);
    setsearchTimeOut(
      setTimeout(() => {
        const searchResults = posts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResult(searchResults);
      }, 500)
    );

  }
  
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Show Case
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI.
        </p>
      </div>
      <div className='mt-16'>
        <FormField
          labelName="Search post"
          type="text"
          name="search"
          value={searchText}
          placeholder="Search post or prompt"
          handleChange={handleSearch}
        />
      </div>
      <div className='mt-10'>
        {
          loading ? (
            <div className='flex justify-center item-center'>
              <Loader />
            </div>
          ) : (
            <>
              {
                searchText && (
                  <h2 className="font-medium text-[#666e75] text-xl mb-3">Showing result for <span>{searchText}</span></h2>
                )
              }
              <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText ? <RenderCards data={searchResult} title="No result found" /> : <RenderCards data={posts} title="No post found" />}
              </div>
            </>
          )
        }
      </div>
    </section>
  )
}
