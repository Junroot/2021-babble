package gg.babble.babble.domain.repository;

import gg.babble.babble.ApplicationTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class TagRepositoryTest extends ApplicationTest {

    @Autowired
    private TagRepository tagRepository;

    @DisplayName("태그 더미 데이터를 확인한다.")
    @ParameterizedTest
    @ValueSource(strings = {"실버", "2시간", "솔로랭크"})
    void dummyGameTest(final String tagName) {
        assertThat(tagRepository.existsById(tagName)).isTrue();
    }
}
