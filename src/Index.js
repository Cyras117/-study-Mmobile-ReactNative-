import React,{useEffect,useState} from 'react' ;
import {SafeAreaView,View,FlatList,ScrollView,Text,StyleSheet,StatusBar,TouchableOpacity} from 'react-native';
import api from './services/api';


export default function App(){
    const [projects,setProjects]= useState([]);

    useEffect(()=>{
        api.get('projects').then(response =>{
            setProjects(response.data); 
        });
    },[projects]);

    async function handleAddProject(){
        const response = await api.post('projects',{
            title: `New${Date.now()}`,
            owner: 'Alex',
        });

        const project = response.data;
        setProjects([...projects,])
    }
    return(
        <>
            <StatusBar barStyle="dark-content"
             backgroundColor="skyblue"/>
            <SafeAreaView style={style.container}>
                <FlatList 
                    data={projects}
                    keyExtractor={p=>p.id} 
                    renderItem={({item:i})=>(
                        <Text style={style.title}>{i.title}</Text>
                    )}    
                />
                <TouchableOpacity 
                activeOpacity={0.7} 
                style={style.button} 
                onPress={handleAddProject}>
                        <Text style={style.buttonText}>Add</Text>
                </TouchableOpacity>
            </SafeAreaView>
            {/*<ScrollView style={style.container}>
                {projects.map(p => (
                    <Text key={p.id} style={style.title}>{p.title}</Text>
                ))}
            </ScrollView>*/}
        </>
    )
};

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'skyblue',
        color:'yellow',
    },
    title:{
        fontSize: 26,
        fontWeight: 'bold',
    },
    button:{
        backgroundColor:'#666666',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize: 26,
        color: '#FFFF'
    },
}); 