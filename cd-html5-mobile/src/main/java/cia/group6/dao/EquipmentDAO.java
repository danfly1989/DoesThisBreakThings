package cia.group6.dao;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import cia.group6.dao.jpa.JPA;
import cia.group6.entities.Equipment;

//@Stateless
@Stateful
@LocalBean
@JPA
public class EquipmentDAO {

	public EquipmentDAO() {
		
	}

	@PersistenceContext(unitName="sprint2")
    private EntityManager em;
	
	public Equipment getEquipmentById(String id) {
		return em.find(Equipment.class, id);
	}
	
	public List<Equipment> getAllEquipments(){
		Query query = em.createQuery("select o from Equipment o", Equipment.class);
		List<Equipment> equipments = query.getResultList();
		return equipments;
	}
	
//	@TransactionAttribute(TransactionAttributeType.REQUIRED)
//	public void addEquipments(List<Equipment> equipments) {
//		for (Equipment equipment : equipments) {
//			em.persist(equipment);
//		}
//	}
//	
//	@TransactionAttribute(TransactionAttributeType.REQUIRED)
//	public void addEquipment(Equipment equipment) {
//		em.persist(equipment);
//	}
	
//	@TransactionAttribute(TransactionAttributeType.REQUIRED)
//	public void mergeEquipments(List<Equipment> equipments) {
//		for (Equipment equipment : equipments) {
//			em.merge(equipment);
//		}
//	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void mergeEquipment(Equipment equipment) {
		em.merge(equipment);
	}
	
}
