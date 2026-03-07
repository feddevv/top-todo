export const ProjectManager = (function() {
    const projects = []

    function addProject(project) {
        projects.push(project)
    }

    function deleteProject(projectId) {
        projects.forEach((el, index) => {
            if (el.id === projectId) {
                projects.splice(index, 1)
                return true
            }
        })
    }

    function getProjects() {
        return projects
    }

    function getProject(projectId) {
        return projects.find(el => el.id === projectId)
    }

    return {
        addProject,
        deleteProject,
        getProjects,
        getProject
    }
})()