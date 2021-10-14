package gg.babble.babble.domain.repository;

import gg.babble.babble.domain.game.Game;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByIdAndDeletedFalse(final Long id);
}
