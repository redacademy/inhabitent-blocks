<?php
/**
 * Plugin Name: Inhabitent Blocks
 * Plugin URI: https://github.com/redacademy/inhabitent-blocks
 * Description: Custom Gutenberg blocks for the Inhabitent website project.
 * Author: mandiwise
 * Author URI: https://redacademy.com
 * Version: 1.1.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/**
 * Register Metaboxes.
 */
// require_once plugin_dir_path( __FILE__ ) . 'src/metaboxes.php';

/**
 * Load Dynamic Blocks.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/hero-image-header/index.php';
// require_once plugin_dir_path( __FILE__ ) . 'src/price/index.php';
