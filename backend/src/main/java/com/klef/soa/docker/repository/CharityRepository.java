package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.soa.docker.entity.CharityEntity;

public interface CharityRepository extends JpaRepository <CharityEntity , Long >{

}
