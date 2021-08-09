package gg.babble.babble.domain.user;

import gg.babble.babble.exception.BabbleIllegalStatementException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

@Embeddable
public class RoomUsers {

    @OneToMany(mappedBy = "room")
    private final List<User> users = new ArrayList<>();

    public void add(final User user) {
        users.add(user);
    }

    public void remove(final User user) {
        users.remove(user);
    }

    public User host() {
        validateGetUser();
        users.sort(Comparator.comparing(User::getJoinedAt));
        return users.get(0);
    }

    public List<User> guests() {
        validateGetUser();
        users.sort(Comparator.comparing(User::getJoinedAt));
        return users.subList(1, users.size());
    }

    private void validateGetUser() {
        if (users.isEmpty()) {
            throw new BabbleIllegalStatementException("유저가 존재하지 않습니다.");
        }
    }

    public int headCount() {
        return users.size();
    }

    public boolean isEmpty() {
        return users.isEmpty();
    }

    public boolean hasUser(final User user) {
        return users.contains(user);
    }
}
