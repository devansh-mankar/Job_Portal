import { Company } from "../models/companyModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export async function registerCompany(req, res) {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required!",
        success: false,
      });
    }
    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already registered!",
        success: false,
      });
    }

    company = await Company.create({
      companyName: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully!",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getCompany(req, res) {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "companies not found!",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getCompanyById(req, res) {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateCompany(req, res) {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;
    console.log(file);
    let cloudResponse;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      // Continue processing the uploaded file
    }
    const logo = cloudResponse.secure_url;

    const updateData = { companyName, description, website, location, logo };

    const company = await Company.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      {
        new: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
