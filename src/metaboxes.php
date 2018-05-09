<?php
/**
 * Register Post Meta.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register post meta so that it only appears on a specific REST API endpoint
 *
 * See https://core.trac.wordpress.org/ticket/38323
 *
 * @todo Once #38323 is resolved, this can be removed and the calling functions can be updated to use
 *       whatever the officially supported solution turns out to be.
 *
 * @param string $meta_type   Type of object this meta is registered to. 'post', 'user', 'term', etc
 * @param array  $meta_fields An array index by the field slug, with values to be passed to `register_meta()` as
 *                            `$args`. For example, `array( '_wcpt_session_slides' => array( 'single' => true ) )`
 * @param string $endpoint    The full path of the endpoint. For example, '/wp-json/wp/v2/sessions/'
 * 
 * @since 1.0.0
 */
function inhabitent_blocks_meta_only_on_endpoint( $meta_type, $meta_fields, $endpoint ) {
	$is_correct_endpoint_request = false !== strpos( $_SERVER['REQUEST_URI'], $endpoint );

	if ( ! $is_correct_endpoint_request ) {
		return;
	}

	foreach ( $meta_fields as $field_key => $arguments ) {
		$arguments = array_merge( $arguments, array( 'show_in_rest' => true ) );

		register_meta( $meta_type, $field_key, $arguments );
	}
}

/**
 * Registering meta fields for block attributes that use meta storage
 * 
 * @since 1.0.0
 */
function inhabitent_blocks_register_meta() {
	// When the `show_in_rest` issue is resolved...
	// $args = array(
	// 		'type' => 'string',
	// 		'single' => true,
	// 		'show_in_rest' => true,
	// );
	// register_meta( 'post', 'price', $args );
	
	inhabitent_blocks_meta_only_on_endpoint( 
		'post', 
		array( 'price' => array( 
			'single' => true, 
			'type' => 'string', 
			'show_in_rest' => true 
		) ),
		'/wp-json/wp/v2/products/'
	);
	
}
add_action('init', 'inhabitent_blocks_register_meta');

