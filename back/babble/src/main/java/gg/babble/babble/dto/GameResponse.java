package gg.babble.babble.dto;

import gg.babble.babble.domain.Game;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameResponse {

    private Long id;
    private String name;

    public static GameResponse from(final Game game) {
        return GameResponse.builder()
                .id(game.getId())
                .name(game.getName())
                .build();
    }
}
