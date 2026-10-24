package com.klef.soa.docker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.jayway.jsonpath.JsonPath;
import com.klef.soa.docker.repository.CharityRepository;
@SpringBootTest
@AutoConfigureMockMvc
class CrudServiceProjectApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private CharityRepository repository;

	@Test
	void contextLoads() {
	}

	@Test
	void createUpdateReadAndDeleteCharity() throws Exception {
		String request = """
				{
				  "fundraiserName": "integration-test",
				  "targetAmount": 1000,
				  "amountRaised": 100,
				  "completed": false
				}
				""";

		String response = mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
				.post("/api/charities").contentType(MediaType.APPLICATION_JSON).content(request))
				.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk())
				.andReturn().getResponse().getContentAsString();
		Long id = ((Number) JsonPath.read(response, "$.id")).longValue();

		try {
			mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
					.get("/api/charities"))
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk())
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers
							.content().string(org.hamcrest.Matchers.containsString("integration-test")));

			mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
					.get("/api/charities/" + id))
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk())
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers
							.content().string(org.hamcrest.Matchers.containsString("integration-test")));

			String update = """
					{
					  "fundraiserName": "integration-test-updated",
					  "targetAmount": 2000,
					  "amountRaised": 200,
					  "completed": false
					}
					""";
			mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
					.put("/api/charities/" + id).contentType(MediaType.APPLICATION_JSON).content(update))
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk())
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers
							.content().string(org.hamcrest.Matchers.containsString("integration-test-updated")));

			mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
					.delete("/api/charities/" + id))
					.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isOk());
		} finally {
			repository.deleteById(id);
		}
	}

	@Test
	void rejectsInvalidCharityAndMissingDelete() throws Exception {
		mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
				.post("/api/charities").contentType(MediaType.APPLICATION_JSON)
				.content("{\"fundraiserName\":\"\",\"targetAmount\":-1,\"amountRaised\":-1,\"completed\":null}"))
				.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isBadRequest());

		mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders
				.delete("/api/charities/999999999"))
				.andExpect(org.springframework.test.web.servlet.result.MockMvcResultMatchers.status().isNotFound());
	}
}
