// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract Dappsy is ERC1155, Ownable {

    struct Project {
        string projectKey;
        uint256 tokenCost;
        uint256 projectID;
        address originalOwner;
        uint256 tokenAvalibles;
    }

    uint256 public totalProjectsCounter;

    mapping(uint256 => Project) public projects; // todos los proyectos

    constructor(address initialOwner)
        ERC1155(
            "https://dappsy.vercel.app/uploads/projects/3165f695-0950-4fe0-82e8-b27a726eea1d-1685325686147.webp"
        )
        Ownable(initialOwner)
    {}

    // Land addition event
    event Add(address indexed _owner, uint256 _projectID);

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _projectID,
        uint256 tokenCount
    );

    function createProject(
        string memory projectKey,
        uint256 tokenCount,
        uint256 projectPrice
    ) public {
        totalProjectsCounter++;

        uint256 projectID = totalProjectsCounter;
        uint256 tokenAmount = projectPrice / tokenCount;

        projects[projectID] = Project({
            tokenCost: tokenAmount,
            projectID: projectID,
            projectKey: projectKey,
            originalOwner: msg.sender,
            tokenAvalibles: tokenCount
        });

        //  Addreess to mint | Token ERC-1155 ID | Cantidad de porciones en las que se puede dividir ese token
        _mint(msg.sender, totalProjectsCounter, tokenCount, "");

        emit Add(msg.sender, projectID);
    }

    function transfer(uint256 _projectID, uint256 tokensToSell) public payable {
        Project memory project = projects[_projectID];
        uint256 transactionAmont = project.tokenCost * tokensToSell;

        require(
            (project.tokenAvalibles - tokensToSell) > 0,
            "No hay suficientes tokens disponibles para realizar esta venta"
        );

        address payable seller = payable(project.originalOwner);
        seller.transfer(transactionAmont);
        _safeTransferFrom(
            project.originalOwner,
            msg.sender,
            _projectID,
            tokensToSell,
            "0x0"
        );

        projects[_projectID].tokenAvalibles -= tokensToSell;
        emit Transfer(project.originalOwner, msg.sender, _projectID, tokensToSell);
    }
}
