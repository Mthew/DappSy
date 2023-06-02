import { ProjectModel, UserModel } from "../../../database";
import { TRANSACTION_TYPE, getDate } from "../../../utils";

export default function (req, res) {
  switch (req.method) {
    case "GET":
      return getData(req, res);
    case "POST":
      return createData(req, res);
    case "PUT":
      return mint(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function createData(req, res) {
  try {
    const { body } = req;
    body.tokenOwners = [];
    body.soldTokens = 0;
    body.soldPercentage = 0;
    body.transactions = [
      {
        status: TRANSACTION_TYPE.Creation,
        tokenCount: body.tokenCount,
        tokenCost: body.tokenCost,
        user: {
          name: body.owner.name,
          profilePhoto: body.owner.profilePhoto || "",
          id: body.owner.userId,
        },
        date: getDate(),
      },
    ];
    console.log("body", body);
    const entry = await ProjectModel.create(body);

    const user = await UserModel.getById(body.owner.userId);
    await UserModel.update(user.id, {...user, projects: [...(user.projects || []), entry.id]});

    res.status(201).json(entry);
  } catch (e) {
    console.log("ERROR", e);
    res.status(400).end();
  }
}

async function getData(req, res) {
  try {
    const entriesData = await ProjectModel.get();
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
}

async function mint(req, res) {
  try {
    const { tokenCount, projectId, userId } = req.body;

    const user = await UserModel.getById(userId);
    const project = await ProjectModel.getById(projectId);
    let ownerPercentage = 0;

    const userTokens = (user.tokens || []).find(
      (token) => token.projectId === projectId
    );

    if (userTokens) {
      userTokens.tokenCount += tokenCount;
      userTokens.ownerPercentage = ownerPercentage =
        (userTokens.tokenCount / project.tokenCount) * 100;

      user.tokens = user.tokens.map((token) =>
        token.projectId === projectId ? userTokens : token
      );
    } else {
      ownerPercentage = (tokenCount / project.tokenCount) * 100;
      user.tokens = user.tokens || [];
      user.tokens.push({
        projectId,
        tokenCount,
        ownerPercentage: ownerPercentage,
      });
    }

    await UserModel.update(userId, user);

    const tokenOwner = (project.tokenOwners || []).find(
      (owner) => owner.userId === userId
    );
    if (tokenOwner) {
      tokenOwner.tokenCount += tokenCount;
      tokenOwner.ownerPercentage = ownerPercentage;
      project.tokenOwners = project.tokenOwners.map((owner) =>
        owner.userId === userId ? tokenOwner : owner
      );
    } else {
      project.tokenOwners = project.tokenOwners || [];
      project.tokenOwners.push({
        userId,
        tokenCount,
        ownerPercentage,
        name: user.name,
        profilePhoto: user.profilePhoto,
      });
    }
    project.soldTokens = project.soldTokens || 0;
    project.soldTokens += tokenCount;
    project.soldPercentage = (project.soldTokens / project.tokenCount) * 100;
    project.transactions = project.transactions || [];
    project.transactions.push({
      status: TRANSACTION_TYPE.Sell,
      tokenCount,
      tokenCost: project.tokenCost * tokenCount,
      user: {
        name: user.name,
        profilePhoto: user.profilePhoto,
        id: user.id,
      },
      date: getDate(),
    });

    await ProjectModel.update(projectId, project);

    res.status(200).json({ project, user });
  } catch (e) {
    console.log("ERROR", e);
    res.status(400).end();
  }
}
