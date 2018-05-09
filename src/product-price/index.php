<?php
/**
 * Server rendering for product price block.
 * 
 * @since 1.0.0
 */

 function inhabitent_blocks_product_price_render($attributes) {
   global $post; // @TODO Better way to grab this from block in future?
   $price = get_post_meta( $post->ID, 'price', true );

   if ( $price ) {
    return '<p class="price">' . $price . '</p>';
   }
   
   return '<p class="price price-unavailable">Price unavailable</p>';
 }

 function inhabitent_blocks_product_price_register() {
  register_block_type( 
    'inhabitent/product-price',
    array( 
      'render_callback' => 'inhabitent_blocks_product_price_render',
      // 'attributes' => array(
      //   'price' => array(
      //     'type' => 'string',
      //     'source' => 'meta',
      //     'meta' => 'price'
      //   )
      // )
    )
  );
 }

 // Make sure that Gutenberg is available
if ( function_exists( 'register_block_type' ) ) {
  add_action( 'init', 'inhabitent_blocks_product_price_register' );
}