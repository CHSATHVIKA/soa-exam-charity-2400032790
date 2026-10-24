package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.Optional;

import com.klef.soa.docker.entity.CharityEntity;
import com.klef.soa.docker.repository.CharityRepository;
import com.klef.soa.docker.service.CharityService;
import org.springframework.stereotype.Service;


@Service
public class CharityServiceImpl implements CharityService{
	private CharityRepository repo;

	public CharityServiceImpl(CharityRepository repo) {
		this.repo = repo;
	}

	@Override
	public CharityEntity saveFund(CharityEntity c) {
		return repo.save(c);
	}

	@Override
	public List<CharityEntity> displayAll() {
		return repo.findAll();
	}

	@Override
	public Optional<CharityEntity> getFundById(Long id) {
		return repo.findById(id);
	}
	
	public Optional<CharityEntity> updateFund(Long id, CharityEntity updated) {
		return repo.findById(id).map(existing -> {
			existing.setFundraiserName(updated.getFundraiserName());
			existing.setTargetAmount(updated.getTargetAmount());
			existing.setAmountRaised(updated.getAmountRaised());
			existing.setCompleted(updated.getCompleted());
			return repo.save(existing);
		});
	}

	public boolean deleteFund(Long id) {
		if (!repo.existsById(id)) {
			return false;
		}
		repo.deleteById(id);
		return true;
	}
	
	

}
