
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
    const [channelDetail, setChannelDetail] = useState(null)
    const [videos, setVideos] = useState([])


    const { id } = useParams();

    useEffect(() => {
       fetchFromAPI(`channels?part=snippet&id=${id}`)
       .then((data) => setChannelDetail(data?.items[0]))

       fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
       .then((data) => setVideos(data?.items))
    }, [id])

  return (
    <Box minHeight="95vh">
       <Box>
         <div style= {{
          background: 'linear-gradient(90deg, rgba(117,12,157,1) 15%, rgba(133,31,182,1) 36%, rgba(105,3,154,1) 52%, rgba(107,17,190,1) 69%)',
          zIndex: 10,
          height:'300px'
         }}
         />
            <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
       </Box>
       <Box display="flex" p="2">
          <Box sx={{ mr:{ sm: '100px' }}} />
              <Videos videos={videos} />
          </Box>
       </Box>
  )
}

export default ChannelDetail
