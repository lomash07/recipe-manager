package com.recipemanager.repository;

import com.recipemanager.model.entity.Role;
import com.recipemanager.model.entity.Role.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // Find role by name
    Optional<Role> findByName(ERole name);
}
