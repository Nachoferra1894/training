import './Home.scss'
import ArmyCard from '../../components/armyCard/ArmyCard'
import { useEffect,useState } from 'react'
import { civilizationApi } from '../../api/civilizationApi'
import MainNavbar from '../../components/mainNavbar/MainNavbar'
import { Typography,CircularProgress } from '@material-ui/core'

const Home = () => {
    const [civilizations, setCivilizations] = useState([])
    const [showCivilizations, setShowCivilizations] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function getData (){
            setLoading(true)
            try {
                const data = await civilizationApi.getCivilizations()
                setCivilizations(data.civilizations)
                setLoading(false)
            }
            catch (err){
                console.log(err)
                setLoading(false)
            }
        }
        getData()
    },[])

    useEffect(()=>{
        setShowCivilizations(civilizations)
    },[civilizations])

    useEffect(()=>{
        search!=="" ? setShowCivilizations(civilizations.filter(x=>x.name.toLowerCase().includes(search.toLowerCase()))):setShowCivilizations(civilizations)
    },[search])

    const handleChangeSearch = (value) =>{
        setSearch(value)
    }

    return (
        <div>
            <MainNavbar handleSearch={handleChangeSearch}/>
                <div className="home-div-all">
                    <div className="home-div-cards">
                    {
                        loading ? 
                            <div style={{marginTop: '5%'}}>
                                <CircularProgress id='home-circular-progress' color="secondary"/>
                            </div>
                        :
                        showCivilizations?.length>0 ?
                            showCivilizations?.map((item,index)=>
                                <ArmyCard index={index} item={item}/>
                            )
                            :
                            <div style={{marginTop: '5%'}}>
                                <Typography color="secondary" variant='h4'>Couldn't find any civilizations</Typography>
                            </div>
                    }
                    </div>
                </div>
        </div>
    )
}

export default Home
