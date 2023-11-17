// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract Dappsy is ERC1155, Ownable {

    struct Project {
        uint256 tokenCost;
        address originalOwner;
        uint256 tokenAvalibles;
    }

    uint256 public totalProjectsCounter;

    mapping(uint256 => Project) public projects; // todos los proyectos

    constructor()
        ERC1155(
            "https://dappsy.vercel.app/uploads/projects/3165f695-0950-4fe0-82e8-b27a726eea1d-1685325686147.webp"
        )
        Ownable(msg.sender)
    {}

    // Land addition event
    event Add(address indexed _owner, uint256 projectKey, uint256 _projectID);

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _projectID,
        uint256 tokenCount
    );

    function createProject(
        uint256 projectKey,
        uint256 tokenCount,
        uint256 tokenAmount
    ) public {
        totalProjectsCounter++;
        
        projects[projectKey] = Project({
            tokenCost: tokenAmount,
            originalOwner: msg.sender,
            tokenAvalibles: tokenCount
        });

        //  Addreess to mint | Token ERC-1155 ID | Cantidad de porciones en las que se puede dividir ese token
        _mint(msg.sender, projectKey, tokenCount, "");

        emit Add(msg.sender, projectKey, totalProjectsCounter);
    }

    function transfer(uint256 _projectKey, uint256 tokensToSell) public payable {
        Project memory project = projects[_projectKey];
        uint256 transactionAmont = project.tokenCost * tokensToSell;

         require(
            project.tokenCost > 0,
            "No hay suficientes tokens disponibles para realizar esta venta"
        );

        require(
            project.tokenAvalibles - tokensToSell > 0,
            "No hay suficientes tokens disponibles para realizar esta venta"
        );

        address payable seller = payable(project.originalOwner);
        seller.transfer(transactionAmont);
        _safeTransferFrom(
            project.originalOwner,
            msg.sender,
            _projectKey,
            tokensToSell,
            "0x0"
        );

        projects[_projectKey].tokenAvalibles -= tokensToSell;
        emit Transfer(project.originalOwner, msg.sender, _projectKey, tokensToSell);
    }
}
