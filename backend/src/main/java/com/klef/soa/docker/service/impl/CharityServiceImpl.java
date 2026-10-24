package com.klef.soa.docker.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.CharityDTO;
import com.klef.soa.docker.entity.CharityEntity;
import com.klef.soa.docker.repository.CharityRepository;
import com.klef.soa.docker.service.CharityService;

@Service
public class CharityServiceImpl implements CharityService {

	private final CharityRepository repo;

	public CharityServiceImpl(CharityRepository repo) {
		this.repo = repo;
	}

	@Override
	public List<CharityDTO> displayAll() {
		return repo.findAll().stream().map(this::toDto).toList();
	}

	@Override
	public Optional<CharityDTO> getFundById(Long id) {
		return repo.findById(id).map(this::toDto);
	}

	@Override
	public CharityDTO saveFund(CharityDTO dto) {
		CharityEntity entity = new CharityEntity();
		copyFields(dto, entity);
		return toDto(repo.save(entity));
	}

	@Override
	public Optional<CharityDTO> updateFund(Long id, CharityDTO dto) {
		return repo.findById(id).map(existing -> {
			copyFields(dto, existing);
			return toDto(repo.save(existing));
		});
	}

	@Override
	public boolean deleteFund(Long id) {
		if (!repo.existsById(id)) {
			return false;
		}
		repo.deleteById(id);
		return true;
	}

	// id is never copied from the request, the database generates it
	private void copyFields(CharityDTO dto, CharityEntity entity) {
		entity.setFundraiserName(dto.getFundraiserName().trim());
		entity.setTargetAmount(dto.getTargetAmount());
		entity.setAmountRaised(dto.getAmountRaised());
		entity.setCompleted(dto.getCompleted());
	}

	private CharityDTO toDto(CharityEntity e) {
		return new CharityDTO(e.getId(), e.getFundraiserName(), e.getTargetAmount(), e.getAmountRaised(),
				e.getCompleted());
	}
}
