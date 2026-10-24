package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;
import com.klef.soa.docker.entity.CharityEntity;

public interface CharityService {
	
	List<CharityEntity> displayAll();
	Optional<CharityEntity> getFundById(Long id);
	CharityEntity saveFund(CharityEntity c);
	Optional<CharityEntity> updateFund(Long id, CharityEntity updated);
	boolean deleteFund(Long id);
}
