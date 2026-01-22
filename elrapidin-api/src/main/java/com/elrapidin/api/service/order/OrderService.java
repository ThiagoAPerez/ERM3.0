package com.elrapidin.api.service.order;

import com.elrapidin.api.domain.entity.order.OrderEntity;
import com.elrapidin.api.domain.entity.order.OrderItemEntity;
import com.elrapidin.api.domain.entity.product.ProductEntity;
import com.elrapidin.api.domain.enums.order.OrderStatus;
import com.elrapidin.api.domain.enums.order.OrderType;
import com.elrapidin.api.domain.repository.OrderItemRepository;
import com.elrapidin.api.domain.repository.OrderRepository;
import com.elrapidin.api.domain.repository.ProductRepository;
import com.elrapidin.api.dto.order.CreateOrderItemRequest;
import com.elrapidin.api.dto.order.CreateOrderRequest;
import com.elrapidin.api.exception.ApiException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;

@Service
public class OrderService {

    private static final BigDecimal DELIVERY_COMMISSION_PERCENT =
            new BigDecimal("0.15");

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public OrderEntity createOrder(Long clientUserId, CreateOrderRequest request) {

        if (request.orderType() != OrderType.SERVICE && request.providerId() == null) {
            throw new ApiException("providerId is required", 400);
        }

        BigDecimal subtotalSale = BigDecimal.ZERO;
        BigDecimal subtotalCost = BigDecimal.ZERO;

        if (request.items() != null) {
            for (CreateOrderItemRequest item : request.items()) {

                ProductEntity product = productRepository
                        .findById(item.productId())
                        .orElseThrow(() -> new ApiException("Product not found", 404));

                BigDecimal qty = BigDecimal.valueOf(item.quantity());

                subtotalSale = subtotalSale.add(
                        product.getSalePrice().multiply(qty));

                subtotalCost = subtotalCost.add(
                        product.getCostPrice().multiply(qty));
            }
        }

        BigDecimal deliveryFee = calculateDeliveryFee(request.orderType());
        BigDecimal deliveryCommission = deliveryFee.multiply(DELIVERY_COMMISSION_PERCENT);
        BigDecimal deliveryEarning = deliveryFee.subtract(deliveryCommission);
        BigDecimal platformMargin = subtotalSale.subtract(subtotalCost);
        BigDecimal totalPrice = subtotalSale.add(deliveryFee);

        String rawCode = generateDeliveryCode();
        String deliveryCodeHash = passwordEncoder.encode(rawCode);

        OrderEntity order = new OrderEntity();
        order.setClientUserId(clientUserId);
        order.setOrderType(request.orderType());
        order.setServiceType(request.serviceType());
        order.setProviderId(request.providerId());
        order.setStatus(OrderStatus.CREATED);

        order.setSubtotalSale(subtotalSale);
        order.setSubtotalCost(subtotalCost);
        order.setPlatformMargin(platformMargin);

        order.setDeliveryFee(deliveryFee);
        order.setDeliveryCommission(deliveryCommission);
        order.setDeliveryEarning(deliveryEarning);

        order.setTotalPrice(totalPrice);

        order.setDeliveryAddress(request.deliveryAddress());
        order.setDeliveryMunicipality(request.deliveryMunicipality());
        order.setDeliveryContactName(request.deliveryContactName());
        order.setDeliveryContactPhone(request.deliveryContactPhone());

        order.setDeliveryCodeHash(deliveryCodeHash);

        orderRepository.save(order);

        if (request.items() != null) {
            for (CreateOrderItemRequest item : request.items()) {

                ProductEntity product = productRepository
                        .findById(item.productId())
                        .orElseThrow(() -> new ApiException("Product not found", 404));

                OrderItemEntity orderItem = new OrderItemEntity();
                orderItem.setOrderId(order.getId());
                orderItem.setProductId(product.getId());
                orderItem.setQuantity(item.quantity());
                orderItem.setCostPrice(product.getCostPrice());
                orderItem.setSalePrice(product.getSalePrice());

                orderItemRepository.save(orderItem);
            }
        }

        System.out.println("DELIVERY CODE (TEST): " + rawCode);

        return order;
    }

    private BigDecimal calculateDeliveryFee(OrderType type) {
        return switch (type) {
            case SERVICE -> new BigDecimal("12000");
            default -> new BigDecimal("8000");
        };
    }

    private String generateDeliveryCode() {
        SecureRandom random = new SecureRandom();
        return String.valueOf(1000 + random.nextInt(9000));
    }
}
