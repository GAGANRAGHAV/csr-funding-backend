import Project from "../models/Projects.js";
import Ngo from "../models/ngo.js";

export const createproject = async (req, res) => {
  const { name, description, ngo, moneyrequired, image } = req.body;

  // Validation (optional, but recommended)
  if (!name || !description || !ngo || !moneyrequired) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingNgo = await Ngo.findById(ngo);
    if (!existingNgo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    const project = new Project({
      name,
      description,
      ngo,
      moneyrequired,
      image,
    });

    await project.save();
    res.status(201).json({ project, message: "Project created successfully" });
  } catch (error) {
    console.error("Error creating project:", error); // Log the error for debugging
    res
      .status(400)
      .json({ message: `Error creating project: ${error.message}` });
  }
};

export const getproject = async (req, res) => {
  try {
    const project = await Project.find();
    res
      .status(200)
      .json({ project, message: "Projects retrieved successfully" });
  } catch (error) {
    console.error("Error retrieving projects:", error);
    // Log the error for debugging
  }
};

export const getprojectbyid = async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
  
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
  
      res.status(200).json({ project, message: "Project retrieved successfully" });
    } catch (error) {
      console.error("Error retrieving project:", error);
      res.status(500).json({ message: "Server error while retrieving project" });
    }
};


  
