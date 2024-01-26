import ProjectSideBar from "./components/projectSideBar";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import SelectedProject from "./components/SelectedProject.jsx";


function App() {
 const [projectState,setProjectState] = useState({
  selectedProjectId:undefined,
  projects: [],
  tasks:[]
 });

function handleAddTask(text){
  setProjectState(prevState=>{
    const newTask = {text: text,
      projectId:prevState.selectedProjectId,
      id: Math.random()};
    return {
      ...prevState,
      tasks:[...prevState.tasks,newTask]
    };
  })
}

function handleDeleteTask(id){
  setProjectState(prevState =>{
    return {
    ...prevState,

    tasks:prevState.tasks.filter((task)=> task.id !== id)
  };
  });
}

 function handleStartAddProject(){
  setProjectState(prevState =>{
    return {
    ...prevState,
    selectedProjectId: null,
  };
  });
 }

function handleCancelAddProject(){
  setProjectState(prevState =>{
    return {
    ...prevState,
    selectedProjectId: undefined,
  };
  });
}

function handleSelectedProject(id){
  setProjectState(prevState =>{
    return {
    ...prevState,
    selectedProjectId: id,
  };
  });
}

function handleDeleteProject(){
  setProjectState(prevState =>{
    return {
    ...prevState,
    selectedProjectId: undefined,
    projects:prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId)
  };
  });
}


 function handleAddProject(projectData){
  setProjectState(prevState=>{
    const newProject = {...projectData, id: Math.random()};
    return {
      ...prevState,
      selectedProjectId:undefined,
      projects:[...prevState.projects,newProject]
    };
  })
 }

const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

 let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask ={handleDeleteTask} tasks={projectState.tasks}/>;

 if(projectState.selectedProjectId === null){
content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
 }
 else if (projectState.selectedProjectId === undefined) {
  content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
 }

 
  return (
      <main className="h-screen my-8 flex gap-8">
     <ProjectSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectedProject} selectedProjectId={projectState.selectedProjectId}/>
     {content}
      </main>
  );
}

export default App;
